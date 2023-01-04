import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../../../components/Layout";
import ServiceReviews from "../../../components/ServiceReviews";
import Spinner from "../../../components/Spinner";
import { AuthContext } from "../../../components/UserContext/UserContext";

const detailsId = () => {
  const router = useRouter();
  const id = router.query.detailsId;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [toogleReview, setToogleReview] = useState(false);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (id) {
      fetch(`https://descent-server.vercel.app/products/details/${id}`)
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setProduct(data);
          setSelectedProduct(data);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, [id]);

  const handleBookingProduct = (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("Sorry!To Buy A Product , Create an Account");
      setSelectedProduct(null);
      return;
    }
    setSpinner(true);
    const form = event.target;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const price = form.price.value;
    const productName = form.productName.value;
    const userPhone = form.userPhone.value;
    const userLocation = form.userLocation.value;
    const bookingProduct = {
      userName,
      userEmail,
      price,
      productName,
      userPhone,
      userLocation,
      productId: selectedProduct._id,
      image: selectedProduct.image,
      quantity: selectedProduct.quantity,
    };
    //console.log(bookingProduct);
    fetch("https://descent-server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setSpinner(false);
        if (data.acknowledged) {
          toast.success("Booking Successfull");
          setSelectedProduct(null);
        } else {
          toast.error(data.message);
          setSelectedProduct(null);
        }
      })
      .catch((err) => {
        setSpinner(false);
        console.log(err);
      });
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("Sorry!To Reveiw , Create an Account");
      setSelectedProduct(null);
      return;
    }
    const form = event.target;
    const comment = form.review.value;
    //console.log(comment);
    const serviceReview = {
      comment: comment,
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      product_id: product?._id,
      product_name: product?.productName,
      comment_date: new Date(),
    };
    //console.log(serviceReview);
    fetch("https://descent-server.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(serviceReview),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        form.reset();

        setToogleReview(!toogleReview);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch(`https://descent-server.vercel.app/reviews?id=${product?._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product?._id, toogleReview]);
  return (
    <Layout>
      <div className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="w-full p-8">
            <img src={product?.image} className="w-auto h-52 mx-auto" alt="" />
          </div>
          <div className="col-span-2 p-8">
            <h3 className="text-4xl font-bold text-accent">
              {product?.productName}
            </h3>
            <p className="font-bold">
              Status:
              {parseInt(product?.quantity) > 0 ? (
                <span className="text-green-700">Available</span>
              ) : (
                <span className="text-red-700">Unavailable</span>
              )}
            </p>
            <p className="font-bold">Price: {product?.price}</p>
            <p>Description:</p>
            <p className="text-justify">{product?.description}</p>
            <div className="mt-4">
              <label
                onClick={() => setSelectedProduct(product)}
                htmlFor="product-modal"
                className="btn btn-primary  bg-gradient-to-r from-primary to-secondary text-white"
              >
                Book Now
              </label>
              <Link href="/products/shirts/shirts">
                <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-8 mt-6 text-white ml-4">
                  View All
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <>
          <input type="checkbox" id="product-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="product-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              {spinner && <Spinner></Spinner>}
              <h3 className="text-lg font-bold text-center my-4">
                Product Information
              </h3>
              <form
                onSubmit={handleBookingProduct}
                className="grid grid-cols-1 gap-4"
              >
                <input
                  type="text"
                  name="userName"
                  defaultValue={user?.displayName}
                  placeholder="Type here"
                  disabled
                  className="input input-bordered w-full max-w-x"
                />
                <input
                  type="text"
                  name="userEmail"
                  defaultValue={user?.email}
                  placeholder="Type here"
                  disabled
                  className="input input-bordered w-full max-w-x"
                />
                <input
                  type="text"
                  name="productName"
                  defaultValue={selectedProduct?.productName}
                  placeholder="Type here"
                  disabled
                  className="input input-bordered w-full max-w-x"
                />
                <input
                  type="text"
                  name="price"
                  defaultValue={selectedProduct?.price}
                  placeholder="Type here"
                  disabled
                  className="input input-bordered w-full max-w-x"
                />
                <input
                  type="text"
                  name="userPhone"
                  placeholder="Enter Phone Number"
                  className="input input-bordered w-full max-w-x"
                  required
                />
                <input
                  type="text"
                  name="userLocation"
                  placeholder="Enter Your Location"
                  className="input input-bordered w-full max-w-x"
                  required
                />

                <input
                  type="submit"
                  className="btn btn-primary  bg-gradient-to-r from-primary to-secondary w-full max-w-x"
                  value="Book"
                />
              </form>
            </div>
          </div>
        </>
      )}
      <div className="w-3/4 sm:w-3/5 md:w-2/5 lg:w-1/5  my-8 mx-2">
        <h3 className="text-xl font-semibold">All Reviews</h3>
        <form
          onSubmit={handleReviewSubmit}
          className="text-center flex flex-row items-center gap-3 mt-3"
        >
          <input
            type="text"
            className="input input-bordered border-2 w-full "
            placeholder="Add Your Review"
            name="review"
            required
          ></input>
          <div>
            <button
              type="submit"
              className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-8  text-white"
            >
              Review
            </button>
          </div>
        </form>
      </div>
      <div className="mx-2">
        {reviews?.map((review) => (
          <ServiceReviews key={review._id} review={review}></ServiceReviews>
        ))}
      </div>
    </Layout>
  );
};

export default detailsId;
