// //import libraries
// import React, { Component } from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import geolib from "geolib";
// import { Icon, Thumbnail } from "native-base";
// import { colors } from "../../styles";
// import styles from "./styles";
//
// // create a component
// export default class CurrentEventCard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       item: {},
//       coords: {}
//     };
//     this.handlePress = this.handlePress.bind(this);
//   }
//
//   componentDidMount() {
//     this._mounted = true;
//     this.state.item = this.props.eventItem;
//     this.selectBackgroundColor();
//   }
//   componentWillUnmount() {
//     this._mounted = false;
//   }
//
//   //Helpers
//   selectBackgroundColor() {
//     if (this._mounted) {
//       var backColors = [
//         colors.bar_rank_1,
//         colors.bar_rank_2,
//         colors.bar_rank_3
//       ];
//       return backColors[Math.floor(Math.random() * backColors.length)];
//     }
//   }
//   handlePress() {
//     this.props.onclick();
//   }
//   render() {
//     const event = this.state.item;
//     console.log(
//       "Pre-Rendering sub Component. Valuation: " +
//         (JSON.stringify(this.state.item) != JSON.stringify({}))
//     );
//     if (JSON.stringify(this.state.item) != JSON.stringify({})) {
//       console.log("Rendering sub Component. Item: " + this.state.item);
//       let creator;
//       if (this.state.item.creatorProfile.picturePath == "") {
//         creator = (
//           <Thumbnail
//             source={require("../../assets/images/profile.png")}
//             style={styles.profilePic}
//           />
//         );
//       } else {
//         creator = (
//           <Thumbnail
//             source={{ uri: this.state.item.creatorProfile.picturePath }}
//             style={styles.profilePic}
//           />
//         );
//       }
//       return (
//         <TouchableOpacity
//           onPress={() => this.handlePress()}
//           style={styles.container}
//         >
//           <View style={styles.sidebar} />
//           <View style={styles.mainInfo}>
//             <View style={styles.titleContainer}>
//               <Text style={styles.title}>{this.state.item.eventName}</Text>
//             </View>
//             <View style={styles.userContainer}>
//               {creator}
//               <Text style={styles.user}>
//                 {this.state.item.creatorProfile.account.username}
//               </Text>
//             </View>
//             <View style={styles.timeContainer}>
//               <Icon name="time" style={styles.timeIcon} />
//               <Text style={styles.time}>
//                 {this.state.item.startingTime.split("T")[1]}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.sideInfo}>
//             <View style={styles.fillContainer}>
//               <Text style={styles.fill}>
//                 <Icon name="contacts" style={styles.fillIcon} />
//                 {this.state.item.countStarters} / {this.state.item.maxStarters}
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       );
//     } else {
//       return null;
//     }
//   }
// }
