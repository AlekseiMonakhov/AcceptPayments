import React from "react";
import {useForm} from "react-hook-form"
import "./style.css"


function App() {
  const { register, handleSubmit, formState: {errors, isValid}, reset} = useForm({mode: "onBlur"});

  const onSubmit = (data) => {
    fetch("/api/payments/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}).then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error! Response status ' + response.status)
            alert('Looks like there was a problem');
            return;
          }
          response.json().then(function(data) {
            alert(JSON.stringify(data));
          });
        }
    )
        .catch(function(err) {
          alert("Error!")
          console.log('Fetch Error : ', err);
        });
    reset()
  }

  return (
    <div className="App">
      <h1>Card payment form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Card Number
          <input {...register("CardNumber", {
            required: "Incorrect! Field is required!",
            pattern: {
              value: /^\d{16}$/,
              message: "Incorrect! 16 digits without spaces required!"
                 },
                 })} />
        </label>
        <div style={{ height: 40}}>
          {errors?.CardNumber && <p>{errors?.CardNumber?.message || "Error!"}</p>}
        </div>

        <label>
          Expiration Date
          <input {...register("ExpDate", {
            required: "Incorrect! Field is required!",
            pattern: {
              value: /^(\d{1,2})\/(\d{4})$/,
              message: "Incorrect! Use MM/YYYY format!"
            }
          })} />
        </label>
        <div style={{ height: 40}}>
          {errors?.ExpDate && <p>{errors?.ExpDate?.message || "Error!"}</p>}
        </div>

        <label>
          CVV
          <input {...register("Cvv", {
            required: "Incorrect! Field is required!",
            pattern: {
              value: /^\d{3}$/,
              message: "Incorrect! 3 digits required!"
            },
          })} />
        </label>
        <div style={{ height: 40}}>
          {errors?.Cvv && <p>{errors?.Cvv?.message || "Error!"}</p>}
        </div>

        <label>
          Amount
          <input {...register("Amount", {
            required: "Incorrect! Field is required!",
            pattern: {
              value: /^\d+$/,
              message: "Incorrect! Only digits!"
            },
          })} />
        </label>
        <div style={{ height: 40}}>
          {errors?.Amount && <p>{errors?.Amount?.message || "Error!"}</p>}
        </div>

        <input type="submit" value="Pay" disabled={!isValid}/>
      </form>
    </div>

  );
}

export default App;
