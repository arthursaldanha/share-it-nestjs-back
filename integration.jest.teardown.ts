/* eslint-disable @typescript-eslint/ban-ts-comment */
export default async () => {
  try {
    // @ts-ignore
    await global.localStackContainer.stop();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
