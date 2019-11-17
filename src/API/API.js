import axios from "axios";

export function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.FATTMERCHANT_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };
}

/**
 * List paginated catalog items from the OMNI api
 * implement https://fattmerchant.docs.apiary.io/#reference/0/catalog/retrieve-all-catalog-items
 */
export const getItems = () => {
  return axios({
    url: `${process.env.FM_API}/item`,
    method: "get",
    headers: getHeaders()
  }).then(result => {
      
      console.log(result.data)
  });
};


 //new invoice 
 // implement https://fattmerchant.docs.apiary.io/#reference/0/invoices/create-an-invoice
 
export const postInvoice = () => {
  return axios({
    url: `${process.env.FM_API}/invoice`,
    method: "post",
    headers: getHeaders()
  }).then(result => result.data);
};