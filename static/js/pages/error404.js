let Error404Page = {
    render: async () => {
        return `
            <div class="error">
                <div class="error__content">
                    Sorry, couldn't find that.
                </div>
            </div>
        `
    },
    after_render: async () => {

    }
}

export default Error404Page;