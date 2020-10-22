const userName = process.env.USER;
const deviceName = process.env.DEVICE_NAME;

module.exports = {
  runtimeDir: `/home/${userName}/${deviceName}/Runtime`,
  publicDir: `/home/${userName}/${deviceName}/UI/ui-backend-for-vr-face-recognition/public`,
  jsonOutputDir: `/home/${userName}/${deviceName}/Data/direct-next-service-by-data-json/file/input`,
};
