import { useCheckout } from "@/context/CheckoutContext"
import type { ShippingInfo } from "@/types/Checkout"
import { useForm, type SubmitHandler } from "react-hook-form"
import styles from "./ShippingForm.module.scss"
import { demoShipping } from "@/utils/demo"

export default function ShippingForm() {
    const { shippingInfo, setShippingInfo, setCurrentStep } = useCheckout()

    const { register, handleSubmit, reset } = useForm<ShippingInfo>({
        defaultValues: shippingInfo ?? {
            fullName: "",
            email: "",
            address: "",
            city: "",
            zip: "",
        },
    })

    const onSubmit: SubmitHandler<ShippingInfo> = (data) => {
        setShippingInfo(data)
        setCurrentStep(2)
        console.log("Shipping Info saved:", data)
    }

    const useDemo = () => {
        reset(demoShipping)
        setShippingInfo(demoShipping)
        // setCurrentStep(2)
    }

    return (
        <form className={styles.shipping} onSubmit={handleSubmit(onSubmit)}>
            <label>Full Name</label>
            <input {...register("fullName", { required: true })} />

            <label>Email</label>
            <input {...register("email", { required: true })} />

            <label>Street Address</label>
            <input {...register("address", { required: true })} />

            <label>City</label>
            <input {...register("city", { required: true })} />

            <label>Zip</label>
            <input {...register("zip", { required: true })} />

            <button type="button" onClick={useDemo} aria-label="Fill with demo data">
                Use demo data
            </button>

            <button type="submit">Next</button>
        </form>
    )
}
