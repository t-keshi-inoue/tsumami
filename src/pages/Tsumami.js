import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { tsumamiData } from "../data/tsumamiData";
import { useSelector, useDispatch } from "react-redux";
import { selectBeer } from "../store/actions";
import { Redirect } from "react-router-dom";

const FixedBottom = styled.div`
  position: absolute;
  bottom: 50px;
`;

const Tsumami = () => {
  const tsumami = useSelector(stat => stat.alc.items);
  const age = useSelector(state => state.alc.age);
  const dispatch = useDispatch();
  const [selectedStore, setSelectedStore] = useState("default");
  const options = [
    {
      name: "選択してください",
      value: "default",
    },
    {
      name: "Seven-Eleven",
      value: "sevenEleven",
    },
    {
      name: "LAWSON",
      value: "lawson",
    },
    {
      name: "All",
      value: "all",
    },
  ];
  if (age === false) {
    return <Redirect to={"./"} />;
  }
  return (
    <Layout>
      <form action="samplel.cgi" method="post">
        <p>メーカー</p>
        <select
          name="maker"
          value={selectedStore}
          onChange={e => setSelectedStore(e.target.value)}>
          {options.map((store, index) => {
            return (
              <option key={index} value={store.value}>
                {store.name}
              </option>
            );
          })}
        </select>
      </form>
      <div>
        {tsumamiData
          .filter(tsumami => tsumami.store === selectedStore)
          .map((tsumamiData, index) => {
            return (
              <li key={index}>
                {tsumamiData.name}
                <button
                  index={index}
                  onClick={() => dispatch(selectBeer(tsumamiData.name))}>
                  choise
                </button>
              </li>
            );
          })}
      </div>
      <FixedBottom>
        <p>yourchoise:</p>
        <br />
        {tsumami.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
        {console.log(tsumami)}
      </FixedBottom>
    </Layout>
  );
};

export default Tsumami;
