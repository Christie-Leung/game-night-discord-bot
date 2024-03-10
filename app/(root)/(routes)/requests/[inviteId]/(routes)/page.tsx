import { Heading } from "@/components/ui/heading"
import { GameForm } from "./components/game-form";

const GeneratePage = ({ params }: {
    params: { inviteId: string }
}) => {

    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <Heading title={"Put your game ideas!"}/>
            <GameForm inviteId={params.inviteId} />
        </div>
    )
}

export default GeneratePage;

