module.exports = async (ctx) => {
  try {
    ctx.status = 200;
  } catch (error) {
    console.log(error);
  }
}