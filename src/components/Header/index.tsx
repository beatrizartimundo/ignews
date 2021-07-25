/* eslint-disable @next/next/no-img-element */
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import Link from 'next/link';
import { AcitveLink } from '../ActiveLink';

export function Header(){
   
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news"/>
                <nav>
                    <AcitveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </AcitveLink>
                    <AcitveLink activeClassName={styles.active} href="/posts">
                      <a>Posts</a>  
                    </AcitveLink>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}