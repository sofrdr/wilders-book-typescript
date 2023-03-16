import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { WildersContext } from "../../utils/context/wildersContext";
import "./AddWilderForm.css";

const url = "http://localhost:5000/api/wilders";

type Inputs = {
  name: string;
  city: string;
  email: string;
};

const AddWilderForm = () => {
  const [errorMsg, setErrorMsg] = useState<String>("");
  const { fetchData } = useContext(WildersContext);
  const addWilder = async (wilder: Inputs) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wilder),
      });
      const data = await response.json();
      fetchData();
      if (data.error) {
        setErrorMsg(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => addWilder(data);

  return (
    <section className="form-container">
      <h2>Add a wilder</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <div className="form-input">
            <label>Name</label>
            <input {...register("name", { required: true })} />
            {errors.name && <div className="error-msg">Name is required</div>}
          </div>

          <div className="form-input">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && <div className="error-msg">Email is required</div>}
          </div>

          <div className="form-input">
            <label>City</label>
            <input {...register("city")} />
          </div>
        </div>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        <br />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddWilderForm;
