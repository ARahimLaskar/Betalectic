import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyButton } from "./MyButton";
import { MyInputBox } from "./MyInputBox";
import { MyTextArea } from "./MyTextArea";
import img from "../assets/page-not-found.png";

export const AddFavorite = () => {
  const [inputValues, setInputValues] = useState("");
  const [favInputValues, setFavInputValues] = useState("");
  const [selectedPackage, setSelectedPackage] = useState({});
  const [result, setResult] = useState([]);
  const [formDataArray, setFormDataArray] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    return storedData || [];
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  let url = "https://api.npms.io/v2/search";

  const getData = (url) => {
    axios
      .get(`${url}?q=${inputValues}`)
      .then((res) => {
        setResult(res.data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setResult([]);
      });
  };

  useEffect(() => {
    setSubmitSuccess(false);

    // Debouncing
    let timerOut = setTimeout(() => {
      getData(url);
    }, 500);
    return () => clearTimeout(timerOut);
  }, [inputValues]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formDataArray));
  }, [formDataArray]);

  const handlePackageSelection = (e, packageName) => {
    setSelectedPackage({ name: packageName, description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      package: selectedPackage.name || "",
      description: favInputValues || "",
    };

    const storedArray = JSON.parse(localStorage.getItem("formData"));

    const packageToCheck = selectedPackage.name;

    let isPackageAlreadyAdded = false;
    for (let i = 0; i < storedArray.length; i++) {
      if (storedArray[i].package === packageToCheck) {
        isPackageAlreadyAdded = true;
        break;
      }
    }

    if (!isPackageAlreadyAdded) {
      setFormDataArray([...formDataArray, formData]);
    } else {
      alert(`Package ${selectedPackage.name} already added to fav list`);
      setLoading(false);
      setInputValues("");
      setSelectedPackage({});
      setFavInputValues("");
      return;
    }

    setTimeout(() => {
      setSubmitSuccess(true);
      setLoading(false);
    }, 1500);

    setInputValues("");
    setSelectedPackage({});
    setFavInputValues("");
  };
  console.log("result", typeof result);
  return (
    <div className="w-full">
      <span
        onClick={() => navigate("/")}
        style={{ paddingBottom: "5rem", cursor: "pointer" }}
        class="material-symbols-outlined"
      >
        keyboard_backspace
      </span>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-12">
          <label className="text-2xl font-semibold">
            Search for NPM Package
          </label>
          <MyInputBox
            onChange={(e) => {
              setInputValues(e.target.value);
            }}
            placeholder="angular"
            type="text"
            value={inputValues}
            required
          />
        </div>
        <div>
          <p class="text-lg font-semibold">Results</p>
          <div className="relative overflow-hidden w-full h-40 overflow-y-auto mt-4">
            {result.length > 0 ? (
              result.map((e, i) => (
                <div className="flex items-center gap-4" key={i}>
                  <MyInputBox
                    type="radio"
                    name="packageSelection"
                    value={e.package.name}
                    onChange={(event) =>
                      handlePackageSelection(event, e.package.name)
                    }
                  />
                  <p style={{ paddingBottom: "5px" }}>{e.package.name}</p>
                </div>
              ))
            ) : (
              <figure>
                <img
                  className="max-h-full w-auto block absolute top-0 left-0"
                  src={img}
                  alt="Search Result Not Found"
                />
                <figcaption className="font-semibold absolute bottom-0">
                  No Search Result Found!
                </figcaption>
              </figure>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-12 mt-20">
          <label className="text-2xl font-semibold">
            Why is this your fav?
          </label>
          <MyTextArea
            onChange={(e) => setFavInputValues(e.target.value)}
            rows="4"
            cols="50"
            value={favInputValues}
            required
          />
        </div>
        <div className="flex justify-end mt-8 ">
          {loading ? (
            <MyButton
              disabled="true"
              style={{ cursor: "no-drop" }}
              value="Loading...."
            />
          ) : submitSuccess ? (
            <button
              disabled={submitSuccess}
              className="flex justify-between items-center gap-8 bg-green-500 text-white border-none cursor-pointer rounded-md px-8 py-3"
              style={{ cursor: "no-drop" }}
            >
              <span className="text-2xl" class="material-symbols-outlined">
                check
              </span>
              Success
            </button>
          ) : (
            <MyButton type="submit" value="Submit" />
          )}
        </div>
      </form>
    </div>
  );
};
