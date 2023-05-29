"use client";

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getProviders, signIn, signOut} from "next-auth/react";

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (<nav className={"flex-between w-full mb-16 pt-3"}>
        <Link className={"flex gap-2"} href={"/"}>
            <Image
                src='/assets/images/logo.svg'
                alt='logo'
                width={30}
                height={30}
                className='object-contain'
            />
            <p className={"logo_text"}>PropmtMania</p>
        </Link>
        {/*Desktop*/}
        <div className={"sm:flex hidden"}>
            {isUserLoggedIn ? (<div className={"flex gap-3 md:gap-5"}>
                <Link className={"black_btn"} href={"/create-prompt"}>
                    Create Post
                </Link>
                <button onClick={() => {
                    signOut
                }} type={"button"} className={"outline_btn"}>
                    Sign out
                </button>
                <Link href={"/profile"}>
                    <Image
                        src='/assets/images/logo.svg'
                        alt='logo'
                        width={37}
                        height={37}
                        className='rounded-full'
                    />
                </Link>
            </div>) : <>
                {providers && Object.values(providers).map((provider) => (<button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                        signIn(provider.id);
                    }}
                    className='black_btn'
                >
                    Sign in
                </button>))}</>}
        </div>

        {/*    Mobile version */}
        <div className='sm:hidden flex relative'>
            {isUserLoggedIn ? (<div>
                <Image
                    src={"/assets/images/logo.svg"}
                    width={37}
                    height={37}
                    className='rounded-full'
                    alt='profile'
                    onClick={() => setToggleDropdown((prev) => !prev)}
                />
                {toggleDropdown && ( <div className='dropdown'>
                    <Link
                        href='/profile'
                        className='dropdown_link'
                        onClick={() => setToggleDropdown(false)}
                    >
                        My Profile
                    </Link>
                    <Link
                        href='/create-prompt'
                        className='dropdown_link'
                        onClick={() => setToggleDropdown(false)}
                    >
                        Create Prompt
                    </Link>
                    <button
                        type='button'
                        onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                        }}
                        className='mt-5 w-full black_btn'
                    >
                        Sign Out
                    </button>
                </div>)}
            </div>) : (<>
                {providers && Object.values(providers).map((provider) => (<button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                        signIn(provider.id);
                    }}
                    className='black_btn'
                >
                    Sign in
                </button>))}</>)}
        </div>

    </nav>);
};

export default Nav;
