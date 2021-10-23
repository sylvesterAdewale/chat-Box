import React from 'react'
import { useDatas } from './AppAuth';
import Button from './Button'

const Header = ({ user }) => {
    const { signout, signInWithGoogle} = useDatas();
    return (
        <div className="w-full px-2 bg-gray-900 z-50 border-blue-500 border-2 rounded-b-lg">
            <div className="flex m-2 z-50 items-center justify-between">
                <h1 className="text-xl text-blue-500 z-50 font-bold">Chat Wall</h1>
                {user ? <Button  onClick={signout}>Sign out</Button> : <Button onClick={signInWithGoogle}>Sign In</Button>}
            </div>
        </div>
    )
}

export default Header
