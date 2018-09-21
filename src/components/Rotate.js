import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'

class Rotate extends Component {
  state = {
    x: 0,
    z: 0,
  }

  componentDidMount() {
    this.handleRotate(this.object)
  }

  handleRotate = object => {
    object.onmousedown = e => {
      let dragging = true
      let prevX = e.pageX
      let prevY = e.pageY

      object.onmousemove = e => {
        if (dragging) {
          const measureFromStartX = e.pageX - prevX
          const measureFromStartY = e.pageY - prevY

          prevX = e.pageX
          prevY = e.pageY

          const x = this.state.x + (measureFromStartY * 100) / 360
          const z = this.state.z + (measureFromStartX * 100) / 360

          this.setState({
            x,
            z,
          })
        }
      }

      object.onmouseup = () => {
        dragging = false
      }
    }
  }

  render() {
    const { children } = this.props
    const { x, z } = this.state
    const rotation = { transform: `rotateX(${x}deg) rotateZ(${z}deg)` }

    return (
      <div
        className={css(styles.parentMeasures)}
        ref={object => (this.object = object)}
      >
        <div className={css(styles.parentMeasures)} style={rotation}>
          {children}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  parentMeasures: {
    width: '100%',
    height: '100%',
  },
})

Rotate.propTypes = { children: PropTypes.node.isRequired }

export default Rotate
