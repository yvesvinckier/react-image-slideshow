const renderTheScene = () =>
    ReactDOM.render(
        <Maestro>
            {({ elements, toggleDay }) => (
                <Sky ref={elements.sky}>
                    <Sun ref={elements.sun} onClick={toggleDay} />
                    <Mountain ref={elements.bigMountain} />
                    <Mountain onClick={toggleDay} />
                </Sky>
            )}
        </Maestro>,
        document.getElementById('root')
    );

const Mountain = React.forwardRef((props, ref) => (
    <InteractivePath
        fill="#FFF"
        d="M121.284 114l28.285 28.284H93z"
        ref={ref}
        onClick={props.onClick}
    />
));

const Sun = React.forwardRef((props, ref) => (
    <InteractivePath
        fill="#FFBD2D"
        d="M149.284 86l28.285 28.284-28.285 28.285L121 114.284z"
        ref={ref}
        onClick={props.onClick}
    />
));

const Sky = React.forwardRef((props, ref) => (
    <div
        style={{
            background: "#000",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}
        ref={ref}
    >
        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            {props.children}
        </svg>
    </div>
));

class Maestro extends React.Component {
    elements = {
        bigMountain: React.createRef(),
        sky: React.createRef(),
        sun: React.createRef()
    };
    timeline = new TimelineMax();

    state = {
        isDay: false
    };

    componentDidMount() {
        const [bigMountain, sky, sun] = Object.values(this.elements).map(ref => ref.current);

        TweenMax.set(bigMountain, { transformOrigin: "0% 100%" });
        TweenMax.set(sun, { visibility: "hidden" });

        this.timeline
            .to(bigMountain, 0.4, { scale: 2, fill: "#9B9B9B", ease: Sine.easeOut })
            .add("lighten-up")
            .set(sun, { visibility: "visible" })
            .to(sun, 0.3, { x: -40, y: -40, ease: Sine.easeOut }, "lighten-up")
            .to(sky, 0.4, { backgroundColor: "#4A4EF7", ease: Sine.easeOut }, "lighten-up")
            .to(bigMountain, 0.4, { fill: "#44D9F4", ease: Sine.easeOut }, "lighten-up")

        this.timeline.pause();
    }

    componentDidUpdate() {
        if (!this.state.isDay) {
            this.timeline.reverse();
        } else {
            this.timeline.play();
        }
    }

    toggleDay = () => {
        this.setState(state => ({ isDay: !state.isDay }));
    };

    render() {
        return this.props.children({
            elements: this.elements,
            toggleDay: this.toggleDay
        });
    }
}

const createCustomPointerComponent = Component => {

    class CustomPointerComponent extends React.Component {
        state = {
            isClicked: false
        };

        render() {
            const { forwardedRef, ...rest } = this.props;

            return (
                <Component
                    ref={forwardedRef}
                    style={rest.onClick && { cursor: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/820793/cursor-pointer${this.state.isClicked ? "-clicked" : ""}.png), pointer` }}
                    onMouseDown={() => this.setState(() => ({ isClicked: true }))}
                    onMouseUp={() => this.setState(() => ({ isClicked: false }))}
                    {...rest}
                />
            );
        }
    }

    const forwardRef = (props, ref) => (
        <CustomPointerComponent {...props} forwardedRef={ref} />
    );

    forwardRef.displayName = typeof Component === "string" ? Component : (Component.displayName || Component.name);

    return React.forwardRef(forwardRef);
}

const InteractivePath = createCustomPointerComponent("path");

renderTheScene();