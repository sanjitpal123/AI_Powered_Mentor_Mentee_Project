import CreatePayment from "../services/Payment";

export const ProcessTransaction = async (e, resContext, navigate) => {
  if (e) e.preventDefault();
  
  try {
    const data = {
      amount: 500,
      currency: "INR",
      receipt: "lsd212",
    };
    const res = await CreatePayment(data);

    console.log("resonse to pay ", res);

    var options = {
      key: "rzp_test_RPjlXkYi5KcmkQ", // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits.
      currency: data.currency,
      name: "MentorSpace", //your business name
      description: "Session Booking Transaction",
      image: "https://example.com/your_logo",
      order_id: res?.order?.id || res?.order?._id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // Success handler
        console.log("Payment Success:", response);
      },
      prefill: {
        name: "sanjit Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "+928848488382", //Provide the customer's phone number
      },
      notes: {
        address: "MentorSpace Head Office",
      },
      theme: {
        color: "#E43737",
      },
    };

    if (window.Razorpay) {
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.error("Payment Failed", response.error);
      });
      rzp1.open();
    } else {
      console.warn("Razorpay SDK not loaded.");
    }
    
    // Fallback/Demo: Auto navigate if status is ok
    if (resContext?.status || resContext?.generateConvo) {
      navigate(`/chat/${resContext.generateConvo._id}`);
    }
  } catch (error) {
    console.log("error to pay money", error);
  }
};
