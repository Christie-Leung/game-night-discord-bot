import { Heading } from "@/components/ui/heading";

const ThankYouPage = () => {
    return (
        <div className="w-full grow flex items-center justify-center">
            <Heading 
                title="Thanks for submitting an idea!"
                description="Feel free to submit more or share it with your friends!"
            />
        </div>
    )
}

export default ThankYouPage;