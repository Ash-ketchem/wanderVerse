"use client";

import { useEffect } from "react";
import { useState } from "react";

const AccordianBoxes = ({ data: packageData, action }) => {
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const availableDates = formData.getAll("date");

    formData.delete("date");

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(
        `/api/admin/packages/${data._id.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formDataObject,
            availableDates: availableDates,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update package");
      }
      window.location.reload();
    } catch (error) {
      setPackageData(data);
      console.error("Error updating package:", error);
      //toast or something
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const availableDates = formData.getAll("date");

    formData.delete("date");

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(`/api/admin/packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formDataObject,
          availableDates: availableDates,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update package");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating package:", error);
      //toast or something
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/admin/packages/${data._id.toString()}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to update package");
    }
    window.location.reload();

    try {
    } catch (error) {}
  };

  const [data, setdata] = useState({});
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setdata(packageData);
    setDates(packageData?.availableDates ?? []);
  }, [packageData]);

  return (
    <>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-md font-medium flex justify-start items-center">
          {data.title}
          <p className="ml-4 ">📝</p>
        </div>
        <div className="collapse-content">
          <form
            className="space-y-4 w-full"
            onSubmit={action == "post" ? handleAdd : handleUpdate}
          >
            <div>
              <label className="input input-bordered flex items-center gap-2">
                Title
                <input
                  type="text"
                  className="grow"
                  placeholder="title"
                  name="title"
                  defaultValue={data.title}
                />
              </label>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="description"
                name="description"
                defaultValue={data.description}
              ></textarea>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                price
                <input
                  type="number"
                  className="grow"
                  placeholder="price"
                  name="price"
                  defaultValue={data.price}
                  min={0}
                />
              </label>
            </div>

            <div className="w-full">
              <label className="input input-bordered flex items-center gap-2 w-full">
                image
                <input
                  type="text"
                  className="grow"
                  placeholder="url"
                  name="image"
                  defaultValue={data.image}
                />
              </label>
            </div>
            <div className="w-full min-h-fit">
              <label className="input input-bordered flex items-center gap-2 w-full h-fit">
                Avaialable Dates
                <div className="flex flex-wrap h-fit">
                  {dates?.map((date, i) => (
                    <input
                      type="date"
                      className="mx-2 flex items-center justify-center"
                      name="date"
                      key={i}
                      defaultValue={new Date(date).toISOString().split("T")[0]}
                    />
                  ))}
                </div>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setDates((state) => [
                      ...state,
                      new Date().toISOString().split("T")[0],
                    ]);
                  }}
                >
                  add
                </button>
              </label>
            </div>
            <div className="space-x-4">
              <button
                className="btn btn-success capitalize font-bold"
                type="submit"
              >
                {action == "post" ? "Add" : "Update"}
              </button>

              <button
                type="reset"
                onClick={handleDelete}
                className={`btn btn-error capitalize font-bold ${
                  action == "post" ? "hidden" : ""
                }`}
              >
                Remove
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccordianBoxes;
