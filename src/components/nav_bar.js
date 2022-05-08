import React from 'react';
import logo from '../logo.svg';


export const Navigation = () => {

    return (
        <div>
            <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
                <div className='container'>

                    <a className='navbar-brand page-scroll' href='/'>
                    <img src={logo} alt="logo" />
                    </a>

                    <div
                        className='collapse navbar-collapse'
                        id='bs-example-navbar-collapse-1'
                    >
                        <ul className='nav navbar-nav navbar-right'>

                            <li>
                                <a href='/network_info'>
                                    Network Info
                                </a>
                            </li>

                            <li>
                                <a href="/stake_tokens" >
                                    Stake Tokens
                                </a>
                            </li>

                            <li>
                                <a href="/wallet">
                                    Wallet
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div> 
    )
};

export default Navigation;


