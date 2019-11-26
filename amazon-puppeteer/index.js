const amazon = require("./amazon");

(async () => {
  await amazon.initialize();
  let details = await amazon.getProductDetails(
    "https://www.amazon.com.mx/Nintendo-Consola-Switch-Neon-Version/dp/B07VGRJDFY?pf_rd_p=fe4a2b07-f748-5800-b3bd-5f04ddb6b36f&pf_rd_r=E7JFSC2GPY1NPM6ADSZG&pd_rd_wg=jEOHH&ref_=pd_gw_ri&pd_rd_w=ATYpE&pd_rd_r=3cc685ac-937c-4855-a01c-88f86dce24b4"
  );
  //   await amazon.end();
  debugger;
})();
