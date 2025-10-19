import { useCheckout } from "@/context/CheckoutContext"
import type { ShippingInfo } from "@/types/Checkout"
import { useForm, type SubmitHandler } from "react-hook-form"
import styles from "./ShippingForm.module.scss"
import { demoShipping } from "@/utils/demo"
import { useNavigate } from "react-router-dom"
import { Button } from "../common/Button/Button"

export default function ShippingForm() {
    const { shippingInfo, setShippingInfo } = useCheckout()
    const navigate = useNavigate()

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
        console.log("Shipping Info saved:", data)
        navigate("../review")
    }

    const useDemo = () => {
        reset(demoShipping)
        setShippingInfo(demoShipping)
    }

    return (
        <div className={styles.shipping}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Shipping Info</h3>

                <input {...register("fullName", { required: true })} placeholder="Full Name" />

                <input {...register("email", { required: true })} placeholder="Email" />

                <input
                    className={styles.streetAddress}
                    {...register("address", { required: true })}
                    placeholder="Street Address"
                />

                <input {...register("city", { required: true })} placeholder="City" />

                <input {...register("zip", { required: true })} placeholder="Zip Code" />

                <Button>Next</Button>
            </form>
            <Button
                className={styles.demoButton}
                onClick={useDemo}
                aria-label="Fill with demo data"
            >
                Use Demo Data
            </Button>
        </div>
    )
}
