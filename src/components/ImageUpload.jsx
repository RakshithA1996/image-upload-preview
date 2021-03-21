import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import dummyImg from "../images/1.jpg";
import { toast } from "react-toastify";

export default function ImageUpload() {
  const [selectedFile, hanldeFile] = useState("");
  const [selectedBanner, hanldeBanner] = useState("");
  const [shopName, hanldeName] = useState("");
  const [cityName, hanldeCity] = useState("");
  const [postalCode, hanldeCode] = useState("");
  const [country, hanldeCountry] = useState("");
  const [facebook, hanldeFacebook] = useState("");
  const [twitter, hanldeTwitter] = useState("");
  const [countryArr, CountryDetails] = useState([]);
  const [uploadFileName, handleUploadFile] = useState("");
  const [uploadedFileName, handleUploadedFileName] = useState("");
  const [bannerPrev, handleBannerPrev] = useState("");

  useEffect(() => {
    getCountries();
  }, [0]);

  const getCountries = () => {
    axios.post("http://3.141.30.48:3010/admin/country/list").then((res) => {
      CountryDetails(res.data);
    });
  };

  const onDivClick = () => {
    document.getElementById("logo").click();
  };

  const onBannerClick = () => {
    document.getElementById("banner").click();
  };

  const onFileChange = (event) => {
    hanldeFile(event.target.files[0]);
    uploadLogo(event.target.files[0]);
  };

  const onNameChange = (event) => {
    hanldeName(event.target.value);
  };

  const validateStoreName = () => {
    const payload = {
      storeName: shopName,
    };
    axios
      .post(
        "http://3.141.30.48:3010/seller/SellerRegistration/validateStore",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          return;
        } else {
          toast.error("Shop name already used");
          hanldeName("");
        }
      });
  };

  const uploadLogo = (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://3.141.30.48:3010/vendor/uploadvendorlogo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res && res.data) {
          handleUploadFile(res && res.data);
        } else {
          toast.error("Logo not uploaded");
        }
      });
  };

  const onBannerChange = (event) => {
    hanldeBanner(event.target.files[0]);
    uploadBanner(event.target.files[0]);
    handleBannerPrev(URL.createObjectURL(event.target.files[0]));
  };

  const uploadBanner = (bannerFile) => {
    const formData = new FormData();
    formData.append("file", bannerFile);
    axios
      .post("http://3.141.30.48:3010/vendor/uploadvendorslider", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res && res.data) {
          handleUploadedFileName(res && res.data);
        } else {
          toast.error("Banner not uploaded");
        }
      });
  };

  const onsubmit = () => {
    const payload = {
      _id: "6047c7ee9342863ad4aa8177",
      Name: shopName,
      Country: country,
      City: cityName,
      PostalCode: postalCode,
      Facebook: facebook,
      Twitter: twitter,
      logo: [
        {
          ClientFileName: selectedFile.name,
          UploadedFileName: uploadFileName,
        },
      ],
      banner: [
        {
          ClientFileName: selectedBanner.name,
          UploadedFileName: uploadedFileName,
        },
      ],
    };
    axios
      .post(
        "http://3.141.30.48:3010/seller/SellerRegistration/_updatedetails",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res && res.data) {
          toast.success("Data sent successfully");
        } else {
          toast.error("Data not sent");
        }
      });
  };

  return (
    <div className="main">
      <div className="main-title">Basic info</div>
      <div className="main-body">
        {/* ................... */}
        <div className="row1">
          <div className="main-body-field">
            <label className="main-body-field-label">Logo (120x120)</label>
            <div onClick={onDivClick} className="main-body-field-file pointer">
              <input
                type="file"
                className="main-body-field-file-input"
                name="example-file-input-custom"
                id="logo"
                onChange={onFileChange}
              />
              <label className="main-body-field-file-label">Choose Image</label>
            </div>
          </div>
          <div className="main-body-field">
            <label className="main-body-field-label">Shop Name </label>
            <input
              type="text"
              className="main-body-field-control"
              placeholder="Pet Name"
              onChange={onNameChange}
              onBlur={() => {
                if (shopName === "") {
                  return;
                } else {
                  validateStoreName();
                }
              }}
              value={shopName}
            />
          </div>
        </div>

        {/* -------------------------- */}
        <div className="row2">
          <div className="row2-main-body-field">
            <label className="row2-main-body-field-label">City</label>
            <input
              type="text"
              className="row2-main-body-field-control"
              placeholder="City"
              value={cityName}
              onChange={(e) => {
                hanldeCity(e.target.value);
              }}
            />
          </div>
          <div className="row2-main-body-field">
            <label className="row2-main-body-field-label">Postal Code</label>
            <input
              type="number"
              className="row2-main-body-field-control"
              placeholder="ZIP Code"
              value={postalCode}
              onChange={(e) => {
                hanldeCode(e.target.value);
              }}
            />
          </div>
          <div className="row2-main-body-field">
            <label className="row2-main-body-field-label">Country</label>
            <select
              className="row2-main-body-field-control_select"
              data-placeholder="Select"
              value={country}
              onChange={(e) => {
                hanldeCountry(e.target.value);
              }}
            >
              <optgroup label="Categories">
                <option>--Select--</option>
                {countryArr &&
                  countryArr.map((data) => {
                    return (
                      <option key={data._id} value={data._id}>
                        {data.Country}
                      </option>
                    );
                  })}
              </optgroup>
            </select>
          </div>
        </div>

        {/* ------------------------------------------- */}

        <div className="imagecheck">
          {/* <input
              name="imagecheck"
              type="checkbox"
              value="1"
              className="imagecheck-input"
            /> */}
          <span className="imagecheck-figure">
            <img
              src={bannerPrev ? bannerPrev : dummyImg}
              alt=""
              className="imagecheck-figure-image"
            />
          </span>
        </div>

        {/* ------------------------------------------- */}

        <div
          className="main-body-field"
          style={{ width: "100%", marginBottom: "1.6rem" }}
          onClick={onBannerClick}
        >
          <label className="main-body-field-label">
            Slider Images (1400x400)
          </label>
          <div className="main-body-field-file pointer">
            <input
              type="file"
              className="main-body-field-file-input"
              name="main-body-field-file-input"
              id="banner"
              onChange={onBannerChange}
            />
            <label className="main-body-field-file-label">Choose Image</label>
          </div>
        </div>

        {/* ---------------------------------------- */}

        <div className="row3">
          <div className="main-body-field">
            <label className="main-body-field-label">
              <i className="icon icon-social-facebook"></i> Facebook Link
            </label>
            <input
              type="text"
              className="main-body-field-control"
              placeholder="www.facebook.com"
              value={facebook}
              onChange={(e) => {
                hanldeFacebook(e.target.value);
              }}
            />
          </div>
          <div className="main-body-field">
            <label className="main-body-field-label">
              <i className="icon icon-social-twitter"></i> Twitter Link
            </label>
            <input
              type="text"
              className="main-body-field-control"
              placeholder="www.twitter.com"
              value={twitter}
              onChange={(e) => {
                hanldeTwitter(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* -------------------- */}
      <div className="card-footer">
        <button onClick={onsubmit} type="submit" className="card-footer-btn">
          Save
        </button>
      </div>
    </div>
  );
}
