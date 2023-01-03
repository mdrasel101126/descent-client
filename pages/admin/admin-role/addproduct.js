import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import AdminLayout from "../../../components/AdminLayout";
import Spinner from "../../../components/Spinner";
import { AuthContext } from "../../../components/UserContext/UserContext";

const AddProduct = () => {
  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const handleAddProduct = (data) => {
    setSpinner(true);
    //console.log(data);
    const image = data.image[0];
    //console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_ImageBB_key}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((formdata) => {
        console.log(formdata);
        data.image = formdata.data.display_url;
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) {
              setSpinner(false);
              toast.success("Product Added Successfully");
              reset();
            }
          })
          .catch((err) => {
            setSpinner(false);
            toast.error("Sorry Something Went Wrong");
          });
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  return (
    <AdminLayout>
      <div className="my-20">
        {spinner && <Spinner></Spinner>}
        <div className="w-11/12 md:w-4/5 lg:w-3/5 mx-auto mt-16 bg-base-200 rounded-xl p-6">
          <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
            Please Add Product
          </h1>
          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className="flex flex-col gap-4"
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                className="input input-bordered w-full"
                {...register("productName", { required: true })}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Image</span>
              </label>

              <input
                type="file"
                className="input input-bordered w-full"
                {...register("image", { required: true })}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                placeholder="Enter Price"
                className="input input-bordered w-full"
                {...register("price", { required: true })}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="text"
                placeholder="Enter Quantity"
                className="input input-bordered w-full"
                {...register("quantity", { required: true })}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className=" select
               select-bordered
               w-full"
                {...register("category")}
              >
                <option value="shirt">Shirt</option>
                <option value="Tshirt">Tshirt</option>
                <option value="Pant">Pant</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                type="text"
                placeholder="Enter Description"
                className="textarea textarea-bordered w-full"
                {...register("description", { required: true })}
              ></textarea>
            </div>
            <input
              className="btn btn-primary w-full  bg-gradient-to-r from-primary to-secondary mt-5"
              type="submit"
              value="Add Product"
            />
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
