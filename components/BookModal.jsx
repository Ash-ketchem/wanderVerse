"use client";
const BookModal = ({ packageId }) => {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/packages", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create package");
      }

      const result = await response.json();

      // Redirect after a successful response
      if (result?._id) {
        window.location.href = `/invoices/${result._id}`;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      //toast or something
    }
  }

  return (
    <div className="w-2/3 mt-4">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary font-bold w-full"
        onClick={(e) => {
          // e.preventDefault();
          document.getElementById("book_modal").showModal();
        }}
      >
        Book Now
      </button>
      <dialog id="book_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-accent">Book your Trip Now</h3>
          <div className="mt-4">
            <form
              className="space-y-4 w-full"
              method="post"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  className="hidden"
                  name="packageId"
                  value={packageId}
                  readOnly
                />
                <label className="input input-bordered flex items-center gap-2">
                  Name
                  <input
                    type="text"
                    className="grow"
                    placeholder="John Samuel"
                    name="name"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  Email
                  <input
                    type="email"
                    className="grow"
                    placeholder="user@site.com"
                    name="email"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  Phone +91
                  <input
                    type="text"
                    className="grow"
                    placeholder="12345678880"
                    name="phone"
                    required
                  />
                </label>
              </div>

              <div className="w-full">
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Travellers
                  <input
                    type="number"
                    className="grow"
                    placeholder="1"
                    name="count"
                    required
                  />
                </label>
              </div>
              <div>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Special requests"
                  name="extra"
                ></textarea>
              </div>
              <div>
                <button
                  className="btn glass w-full bg-primary text-primary-content capitalize font-bold text-lg"
                  type="submit"
                >
                  book now
                </button>
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={(e) => e.stopPropagation()}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookModal;
