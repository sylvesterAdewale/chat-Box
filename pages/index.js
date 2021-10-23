import Head from 'next/head'
import { useDatas } from '../components/AppAuth'
import Button from '../components/Button';
import Channel from '../components/Channel';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { useRouter } from 'next/router'

function Post({ post }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Render post...
}

export default function Home() {
  const {signInWithGoogle, loading, currentUser, db, error} = useDatas();


  return (
    <div className="min-h-screen bg-gray-900 text-blue-400">
      <Head>
        <title>Chat Wall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen relative overflow-hidden">
        <Header user={currentUser} />
        <div className="flex flex-col justify-center items-center">
          {loading && <Loading />}
          {error && <div>{error}</div>}
          { currentUser ? 
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-center mt-5">
                <h1 className="text-xl z-50 font-bold">Chat Wall</h1>
                <p>Welcome {currentUser.displayName}</p>
              </div>
              <Channel user={currentUser} db={db} />
            </div> 
            : <div className="w-full h-96 text-center flex flex-col items-center justify-center">
              <div className="p-4 rounded-lg w-9/12 flex flex-col justify-center h-3/6 border-blue-500 border-2">
                <h1 className="text-xl font-bold">Chat Wall</h1>
                <p className="p-2">Sign in to get chatting</p>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  )
}
 