/** @format */

import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { link } from "../link";

import { CartContext } from "../contexts/CartContext";
import { CategoryContext } from "../contexts/CategoryContext";

import React from "react";
// import App from "../App";

// Importing styles
import "../styles/categories.css";
import "../styles/Category.css";

import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Sort from "../components/Sort";
// import Cart from "./Cart";

export const Category = ({ onAdd, qty, gridCategories }) => {
  const { quantity, setQuantity } = qty;
  // console.log(quantity);
  const { cart, setCart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  const skeletonQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // console.log("category", cart);
  /////////////////////////////////////////////////
  const {
    catgProducts,
    setCatgProducts,
    checkBoxBrand,
    setCheckBoxBrand,
    updatedCheckboxes,
    setUpdatedCheckboxes,
    checkBoxType,
    setCheckBoxType,
  } = useContext(CategoryContext);

  const [searchArray, setSearchArray] = useState([]);

  const params = useParams();

  // console.log(catgProducts);

  const checkingUrl = () => {
    const itemName = gridCategories.map((item) => {
      return item.name;
    });
    // console.log(itemName);

    if (!itemName.includes(params.type)) {
      throw new Error("Category does not exist");
    }
  };

  checkingUrl();

  // console.log(params.type);

  const getProducts = async () => {
    try {
      const res = await fetch(
        `https://ecommercial-app-backend.onrender.com/api/products/${params.type}`
      );
      // const res = await fetch(`/api/products/${params.type}`);
      const data = await res.json();
      ////////////////////////////////////////////

      const uniqueBrands = [
        ...new Map(
          data.map((brand) => [brand["product_brand"], brand])
        ).values(),
      ];

      const uniqueTypes = [
        ...new Map(
          data.map((types) => [types["product_type"], types])
        ).values(),
      ];

      setCatgProducts(data);
      setSearchArray(data);
      setUpdatedCheckboxes(data);
      setCheckBoxBrand(uniqueBrands);
      setCheckBoxType(uniqueTypes);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1 className="category-title">{params.type}</h1>
      <div className="header-category">
        {catgProducts.length === 0 ? "" : <p>{catgProducts.length} Products</p>}
        <Sort />
      </div>
      {/* <div> */}
      <div className="category-container">
        <aside className="category-aside ">
          <Filter />
        </aside>

        <div className="category-wrapper">
          {loading
            ? skeletonQuantity.map((skeleton) => {
                return (
                  <Stack key={skeleton} spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}

                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="rounded" width={270} height={150} />
                    {/* <Skeleton
                      variant='text'
                      width={270}
                      height={120}
                      sx={{ fontSize: "1rem" }}
                    /> */}
                    {/* <Skeleton variant='text' sx={{ fontSize: "1rem" }} /> */}

                    <Skeleton variant="rectangular" width={200} height={20} />
                    <Skeleton variant="rectangular" width={50} height={20} />
                    <Skeleton variant="rectangular" width={200} height={30} />
                  </Stack>
                );
              })
            : catgProducts.map((product, index) => {
                return (
                  <ProductCard key={index} onAdd={onAdd} product={product} />
                );
              })}
        </div>
      </div>
    </div>
  );
};
