import React, { useEffect, useState } from "react";
import ProductionsCate from "./components/ProductionsCate";
import ProductionsContainer from "./components/ProductionsContainer";
import ProductionsNav from "./components/ProductionsNav";
import ProductionsPrdWrap from "./components/ProductionsPrdWrap";
import "../../css/production/production.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Productions() {

  const [count, setCount] = useState('');
  const [quiryCount, setQuiryCount] = useState('');
  const [list, setList] = useState([]);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [priceOrigin, setPriceOrigin] = useState(0);
  const params = useParams();
  const [qtyFlag, setQtyFlag] = useState(false);

  const getCount = (e) => {

    setCount(e.sum.sum)

  }

  const getQuiryCount = (e) => {

    setQuiryCount(e)

  }

  const getPrice = (e) => {

    setPrice(list.sale_price * e.qty)
    setQty(e.qty)
    setQtyFlag(e.qtyFlag)

  }






  useEffect(() => {
    axios({

      method: "get",
      url: `http://127.0.0.1:8000/production/${params.pid}`

    }).then((result) => {

      setList(result.data[0])

    })

  }, [])

  return (

    <>
      <section className="production_selling_wrap">
        <div className="production_selling_inner inner">
          <ProductionsCate />
          <ProductionsContainer count={count}
            getPrice={getPrice}
            price={price}
            qty={qty}
            qtyFlag={qtyFlag}
          />
        </div>
        <ProductionsNav count={count}
          quiryCount={quiryCount}
        />
        <ProductionsPrdWrap
          getCount={getCount}
          getQuiryCount={getQuiryCount}
          price={price}
          priceOrigin={list.sale_price}
          subTitle={list.product_name}
          getPrice={getPrice}
          qty={qty}
          qtyFlag={qtyFlag}
        />
      </section >
    </>

  )

}