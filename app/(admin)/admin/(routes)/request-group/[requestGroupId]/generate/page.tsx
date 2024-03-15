
import { GenerateForm } from "./component/generate-form";

type Request = {
  name: string,
  description: string,
  requestGroupId: string,
  userId: string,
}

const RequestGeneratePage = ({ params }: {
  params: { requestGroupId: string }
}) => {

    return (
      <div className="flex grow flex-col items-center justify-center">
        <GenerateForm params={params}/>
      </div>
    )
}

export default RequestGeneratePage;