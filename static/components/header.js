class Header {
    render() {
        return `
            <header>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="text-align: left;">
                        <a href="/"><span>Logo Placeholder</span></a>
                    </div>
                    <div style="text-align: right;">
                        <button id="theme-toggle">☀️ / 🌙</button>
                    </div>
                </div>
            </header>
        `;
    }
}

export default Header;