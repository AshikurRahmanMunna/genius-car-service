import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    const url = `https://powerful-hollows-72000.herokuapp.com/service`;
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      toast('Service Added');
    })
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please Add a service</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
      <input className="mb-2 pl-2" placeholder="Name" {...register("name", { required: true, maxLength: 20 })} />
      <textarea className="mb-2 pl-2" placeholder="Description" {...register("description")} />
      <input className="mb-2 pl-2" placeholder="Price" type="number" {...register("price")} />
      <input className="mb-2 pl-2" placeholder="Photo URL" type="text" {...register("img")} />
      <input type="submit"  value="Add Service" />
    </form>
    </div>
  );
};

export default AddService;
