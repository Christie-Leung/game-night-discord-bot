
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  
  const { data: gameRequests, error } = await supabase
  .from('GameRequests')
  .select('*');
  console.log(gameRequests);
  console.log(error);
  return (
    <ul>
      <text>hi</text>
      {gameRequests?.map((gameRequest) => (
        <li>{gameRequest.game_name}</li>
      ))}
    </ul>
  )
}
