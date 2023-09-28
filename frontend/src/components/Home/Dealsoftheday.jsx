import React from "react";
import "./dealsofday.css";

export default function Dealsoftheday(props) {
  return (
    <div className="border p-3 my-3">
      <h2>{props.title}</h2>
      <div className="border d-flex overflow-x-scroll my-component gap-2 align-items-center my-3">
        <div className="border p-1">
          <div>
            <img
              src="https://cdn.shopclues.com/images1/thumbnails/117329/200/200/153427775-117329417-1691750490.jpg"
              alt=""
            />
          </div>
          <p>
            <b>Apple Iphone 6s</b>
          </p>
          <p>899$</p>
        </div>
        <div className="border p-1">
          <img
            src="https://cdn.shopclues.com/images1/thumbnails/117212/200/200/153394779-117212707-1687161422.jpg"
            alt=""
          />
          <p>
            <b>RedChief UltraBoots 7x</b>
          </p>
          <p>329$</p>
        </div>
        <div className="border p-1">
          <img
            src="https://cdn.shopclues.com/images1/thumbnails/103419/280/1/148130677-103419160-1571212818.jpg"
            alt=""
          />
          <p>
            <b>Keto Whey Protein(1kg)</b>
          </p>
          <p>150$</p>
        </div>
        <div className="border p-1">
          <img
            src="https://cdn.shopclues.com/images1/thumbnails/104507/280/1/148819339-104507472-1579085071.jpg"
            alt=""
          />
          <p>
            <b>Realme Watch 2</b>
          </p>
          <p>129$</p>
        </div>
        <div className="border p-1">
          <img
            src="https://cdn.shopclues.com/images/thumbnails/27595/280/1/11448611056.jpg"
            alt=""
          />
          <p>
            <b>TNC Sipper</b>
          </p>
          <p>19$</p>
        </div>
        <div className="border p-1">
          <img
            src="https://cdn.shopclues.com/images1/thumbnails/99205/200/200/145407777-99205974-1668508687.jpg"
            alt=""
          />
          <p>
            <b>WXL Vegi Chopper</b>
          </p>
          <p>15$</p>
        </div>
        <div className="border p-1">
          <img
            src="https://cdn.shopclues.com/images1/thumbnails/116672/200/200/153182845-116672079-1668065300.jpg"
            alt=""
          />
          <p>
            <b>Bajaj Iron</b>
          </p>
          <p>159$</p>
        </div>
      </div>
    </div>
  );
}
