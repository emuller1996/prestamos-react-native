export function ViewDollar(strt: any) {
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "COP",
    });
  
    return USDollar.format(strt);
  }