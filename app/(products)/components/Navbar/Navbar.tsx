'use client';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { type IUser } from '@/app/(user)/types';
import { CiSearch } from 'react-icons/ci';
import { MdManageAccounts } from 'react-icons/md';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import {
  Navbar as NUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Input,
  DropdownSection
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface Props {
  session: IUser;
}

interface IOptions {
  name: string;
  query: string;
}

const options: IOptions[] = [
  { name: 'Home', query: '' },
  { name: 'Series', query: '' },
  { name: 'Films', query: '' },
  { name: 'New & Popular', query: '' },
  { name: 'My List', query: '' },
  { name: 'Browse by languages', query: '' }
];

const TOP_OFFSET = 66;

function Navbar({ session }: Props): JSX.Element {
  const router = useRouter();
  const [navbarBackground, setNavbarBackground] = useState(false);

  const onLogout = async (): Promise<void> => {
    await signOut();
    router.refresh();
  };

  const handleScroll = (): void => {
    if (window.scrollY >= TOP_OFFSET) {
      setNavbarBackground(true);
    } else {
      setNavbarBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NUINavbar
      className={`${navbarBackground ? '' : 'bg-transparent backdrop-blur-0'} fixed`}
      position='sticky'
      maxWidth='full'
    >
      <NavbarContent className='flex gap-4 ' justify='center'>
        <NavbarBrand>
          <NextImage src='/images/logo.png' width={80} height={50} alt='logo' />
        </NavbarBrand>
        {options.map((opt) => (
          <NavbarItem className='hidden md:flex' key={opt.name}>
            <Link className='text-xs' color='foreground' href='#'>
              {opt.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as='div' justify='end'>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[12rem] h-10 text-xs',
            mainWrapper: 'h-full',
            input: 'text-xs',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
          }}
          placeholder='Type to search...'
          size='sm'
          startContent={<CiSearch size={20} />}
          type='search'
        />
        <Dropdown placement='bottom-end' className='bg-blue-950 '>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='pl-8 box-border transition-transform'
              color='primary'
              size='sm'
              src={session.image ?? ''}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='bordered' color='primary'>
            <DropdownSection
              aria-label='Profile & Actions'
              showDivider
              dividerProps={{ className: 'mt-3 bg-white' }}
            >
              <DropdownItem
                key='profile'
                startContent={
                  <NextImage
                    className='rounded-sm'
                    src='/images/default-blue.png'
                    width={20}
                    height={20}
                    alt='profile'
                  />
                }
              >
                {session.name}
              </DropdownItem>
            </DropdownSection>
            <DropdownSection
              aria-label='Profile & Actions'
              showDivider
              dividerProps={{ className: 'mt-3 bg-white' }}
            >
              <DropdownItem key='profile' startContent={<MdManageAccounts size={20} />}>
                Account
              </DropdownItem>
              <DropdownItem key='settings' startContent={<AiOutlineSetting size={20} />}>
                My Settings
              </DropdownItem>
            </DropdownSection>
            <DropdownSection
              className='md:hidden'
              aria-label='Profile & Actions'
              showDivider
              dividerProps={{ className: 'mt-3 bg-white' }}
            >
              {options.map((opt) => (
                <DropdownItem key={opt.name}>{opt.name}</DropdownItem>
              ))}
            </DropdownSection>
            <DropdownItem
              key='logout'
              startContent={<BiLogOut size={20} />}
              color='danger'
              onClick={() => {
                void onLogout();
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NUINavbar>
  );
}

export default Navbar;
