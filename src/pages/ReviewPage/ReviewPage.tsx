import { Button } from "@/components/common/Button/Button"
import { useNavigate } from "react-router-dom"

export default function ReviewPage() {
    const navigate = useNavigate()

    return (
        <>
            <h2>This is the ReviewPage</h2>
            <Button onClick={() => navigate("../success")} children={"Confirm & Pay"} />
        </>
    )
}
