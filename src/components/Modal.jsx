import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const Modal = (props) => {
  let [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productId = props.id;
    const userData = {
      email: email,
      price: price,
    };

    await axios.post(
      `http://localhost:3000/product/${productId}/user`,
      userData
    );

    setIsSubmitting(false);
    setEmail("");
    setPrice("");
    closeModal();
  };

  return (
    <>
      <button
        className="rounded-full bg-dark text-white lg:w-1/2 w-full p-3 text-center text-lg font-bold"
        onClick={openModal}
      >
        Track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={closeModal}
          className="fixed inset-0 overflow-y-auto"
          style={{ zIndex: 1000 }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="p-6  bg-white inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-2xl">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3">
                      <img
                        src="\src\assets\icons\logo.svg"
                        alt="logo"
                        height={28}
                        width={28}
                      />
                    </div>
                    <img
                      src="\src\assets\icons\x-close.svg"
                      alt="close"
                      height={24}
                      width={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>
                  <h4 className="text-secondary text-lg leading-[24px] font-semibold mt-4 font-monospace">
                    Stay updated with product pricing alerts right in your
                    inbox!
                  </h4>
                  <p className="text-gray-600 mt-2 text-sm font-monospace">
                    Never miss a bargain again with the timely alert!
                  </p>
                </div>
                <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-600"
                  >
                    Email Address
                  </label>
                  <div className=" px-5 py-3 mt-3 flex items-center gap-2 border border-gray-300 rounded-[27px]">
                    <img
                      src="\src\assets\icons\mail.svg"
                      alt="mail"
                      width={18}
                      height={18}
                    />
                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="abc@gmail.com"
                      className="flex-1 pl-1 border-none text-gray-500 text-base focus:outline-none rounded-[27px] shadow-xs h-full"
                    />
                  </div>
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-600 mt-2"
                  >
                    Set Price Alert
                  </label>
                  <div className=" px-5 py-3 mt-3 flex items-center gap-2 border border-gray-300 rounded-[27px]">
                    <img
                      src="\src\assets\icons\price-tag.svg"
                      alt="price"
                      width={18}
                      height={18}
                    />
                    <input
                      required
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Set Price Alert"
                      className="flex-1 pl-1 border-none text-gray-500 text-base focus:outline-none rounded-[27px] shadow-xs h-full"
                    />
                  </div>
                  <button className="btn btn-dark w-full text-lg font-semibold rounded-10 mt-3">
                    Track
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
