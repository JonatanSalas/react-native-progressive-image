import React from "react";
import PropTypes from "prop-types";
import { Animated, View, Image, StyleSheet } from "react-native";

export default class ProgressiveImage extends React.Component {
    static propTypes = {
        placeHolderColor: PropTypes.string,
        placeHolderSource: PropTypes.number,
        imageSource: PropTypes.object.isRequired,
        imageFadeDuration: PropTypes.number.isRequired,
        onLoadThumbnail: PropTypes.func.isRequired,
        onLoadImage: PropTypes.func.isRequired,
        thumbnailSource: PropTypes.object.isRequired,
        thumbnailFadeDuration: PropTypes.number.isRequired,
        thumbnailBlurRadius: PropTypes.number
    };

    static defaultProps = {
        thumbnailFadeDuration: 250,
        imageFadeDuration: 250,
        thumbnailBlurRadius: 5,
        onLoadThumbnail: Function.prototype,
        onLoadImage: Function.prototype
    };

    state = {
        imageOpacity: new Animated.Value(0),
        thumbnailOpacity: new Animated.Value(0)
    };

    getTimingOptions = type => ({
        toValue: 1,
        duration: this.props[`${type}FadeDuration`]
    });

    onLoadThumbnail() {
        Animated.timing(this.state.thumbnailOpacity, this.getTimingOptions("thumbnail")).start();

        this.props.onLoadThumbnail();
    }

    onLoadImage() {
        Animated.timing(this.state.imageOpacity, this.getTimingOptions("image")).start();

        this.props.onLoadImage();
    }

    render() {
        return (
            <View style={this.props.style}>
                <Image
                    resizeMode="cover"
                    style={[styles.image, this.props.style]}
                    source={this.props.placeHolderSource}
                />
                <Animated.Image
                    resizeMode="cover"
                    style={[
                        styles.image,
                        { opacity: this.state.thumbnailOpacity },
                        this.props.style
                    ]}
                    source={this.props.thumbnailSource}
                    onLoad={() => this.onLoadThumbnail()}
                    blurRadius={this.props.thumbnailBlurRadius}
                />
                <Animated.Image
                    resizeMode="cover"
                    style={[
                        styles.image,
                        { opacity: this.state.imageOpacity },
                        this.props.style
                    ]}
                    source={this.props.imageSource}
                    onLoad={() => this.onLoadImage()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});
