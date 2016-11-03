/**
 * the universal timeline
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  RefreshControl
} from 'react-native'
import _ from 'lodash'
import moment from 'moment'

import { getColor } from '../../../utils/getColor'
import Post from '../components/Post'

// Make a common query
const firebaseRefName = 'posts/';
const query = (firestack, ordering='first') => {
  let ref = firestack.database
            .ref(firebaseRefName)
            .orderByChild('timestamp');

  if (ordering === 'first') {
    ref = ref.limitToFirst(3)
  } else {
    ref = ref.limitToLast(3)
  }
  return ref.once('value');
}

const getPostsFromSnapshot = (snapshot) => {
  // Trick for getting ordering
  return snapshot.reverseMap(i => i);
}

class Timeline extends Component {
  constructor(props) {
    super(props)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      isRefreshing: false,
      updateNotification: null,
      posts: []
    }
  }

  componentDidMount() {
    const {firestack} = this.props;

    query(firestack, 'last')
      .then((snapshot) => {
        this.setState({
          posts: getPostsFromSnapshot(snapshot)
        })
      })
      .catch((error) => {
        console.error(error);
      })
      setTimeout(() => {
        this.setState({ updateNotification: 'Pull to refresh...' })
      }, 1000)
  }

  componentWillUnmount() {
    this.props.firestack.database.ref(firebaseRefName).off();
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  _onRefresh = () => {
    const {firestack} = this.props;
    this.setState({ isRefreshing: true })
    query(firestack, 'last')
    .then((snapshot) => {
      // this.props.savePosts(snapshot.val())
      this.setState({
        isRefreshing: false, 
        updateNotification: null,
        posts: getPostsFromSnapshot(snapshot)
      })
    })
  }

  render() {
    const notify = this.state.updateNotification ?
    <Text style={styles.updateNotificationStyle}>
      {this.state.updateNotification}
    </Text>
    : null

    const view = this.state.posts ?
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
          tintColor="#ff0000"
          title="Loading..."
          titleColor="#00ff00"
          colors={[getColor()]}
          progressBackgroundColor={getColor('#ffffff')}
        />
      }>
      {notify}
      {this._renderPosts()}
      </ScrollView>
    :
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh.bind(this)}
        tintColor="#ff0000"
        title="Loading..."
        titleColor="#00ff00"
        colors={[getColor()]}
        progressBackgroundColor={getColor('#ffffff')}
      />
    }>
      <View style={styles.waitView}>
        <Text>Nothing there yet.</Text>
      </View>
    </ScrollView>

    return (
      <View style={styles.container}>
        {view}
      </View>
    )
  }

  _renderPosts = () => {
    const postArray = []
    _.forEach(this.state.posts, (value, index) => {
      const timestamp = value.time
      //const timestamp = value.timestamp
      const timeString = moment(timestamp).fromNow()
      postArray.push(
        <Post
        postTitle={value.title}
        posterName={value.name}
        postTime={timeString}
        postContent={value.text}
        key={index}
        navigator={this.props.navigator}
        />
      )
    })
    //_.reverse(postArray)
    return postArray
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  waitView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  updateNotificationStyle: {
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 5
  }
});

export default Timeline