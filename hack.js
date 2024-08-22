const { exec } = require('child_process');

function getWiFiProfiles() {
    return new Promise((resolve, reject) => {
        exec('netsh wlan show profiles', (err, stdout, stderr) => {
            if (err) {
                return reject(`Error retrieving profiles: ${err.message}`);
            }
            if (stderr) {
                return reject(`stderr: ${stderr}`);
            }

            // Extract profile names
            const profileNames = stdout.match(/(?:All User Profile\s*:\s*)(.*)/g)
                .map(line => line.split(':')[1].trim());

            let results = [];
            let promises = profileNames.map(profileName => {
                return new Promise((resolve, reject) => {
                    exec(`netsh wlan show profile name="${profileName}" key=clear`, (err, stdout, stderr) => {
                        if (err) {
                            // Log the error but resolve to skip this profile
                            console.error(`Error retrieving profile info for ${profileName}: ${err.message}`);
                            return resolve(); // Continue to the next profile
                        }
                        if (stderr) {
                            // Log stderr but resolve to skip this profile
                            console.error(`stderr for ${profileName}: ${stderr}`);
                            return resolve(); // Continue to the next profile
                        }

                        // Extract password
                        const keyContent = stdout.match(/Key Content\s*:\s*(.*)/);
                        const password = keyContent ? keyContent[1] : 'No password set';

                        results.push({
                            profile: profileName,
                            password: password
                        });
                        resolve();
                    });
                });
            });

            Promise.all(promises)
                .then(() => resolve(results))
                .catch(reject);
        });
    });
}

module.exports = { getWiFiProfiles };
