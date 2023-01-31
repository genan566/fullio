import React, { Component } from 'react'
import { IoArrowUp } from 'react-icons/io5';
import "./ScrollToBtn.scss";


export class ScrollToTopBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTopBtn: false
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 350) {
                this.setState({ showTopBtn: true })
            } else {
                this.setState({ showTopBtn: false })
            }
        });
    }

    goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    render() {

        return (
            <>
                <div className={this.state.showTopBtn ? "absolute bg-red-400" : "absolute bg-orange-300"}
                    onClick={this.goToTop}>
                    <IoArrowUp
                        color="white"
                        size={17}
                    />
                </div>
                {this.props.children}
            </>

        )
    }
}

export default ScrollToTopBtn;