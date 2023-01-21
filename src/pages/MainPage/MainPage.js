import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {
    render() { 
        return (
            <div className="main_page">
                <Header />
                <main className="main_page_content">
                    <section className="main_page_main-section">
                        <div className="main_page_search-box">
                            <SearchBox />
                        </div>
                        <div className="main_page_movies">
                            <Movies />
                        </div>
                    </section>
                    <aside className="main_page_favorites">
                        <Favorites />
                    </aside>
                </main>
            </div>
        );
    }
}
 
export default MainPage;