module.exports = (product, template) => {
  const {
    id,
    productName,
    image,
    from,
    nutrients,
    quantity,
    price,
    organic,
    description,
  } = product;

  let output = template.replace(/{%PRODUCTNAME%}/g, productName);
  output = output.replace(/{%IMAGE%}/g, image);
  output = output.replace(/{%FROM%}/g, from);
  output = output.replace(/{%NUTRIENTS%}/g, nutrients);
  output = output.replace(/{%QUANTITY%}/g, quantity);
  output = output.replace(/{%PRICE%}/g, price);
  output = output.replace(/{%DESCRIPTION%}/g, description);
  output = output.replace(/{%ID%}/g, id);

  if (!organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};
