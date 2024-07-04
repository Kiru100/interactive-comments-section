import { CommentInterface } from '@/constants/interfaces';
import commentStore from '@/stores/comments';
import userStore from '@/stores/user';
import { Image } from 'expo-image';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Modal from "react-native-modal";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Comment = ({data: {content, upvotes, downvotes, user_profile, date, comment_id}} : {data: CommentInterface}) => {
	const current_user = userStore((store) => store.current_user);
	const upComment = commentStore((store) => store.upComment);
	const downComment = commentStore((store) => store.downComment);
	const deleteComment = commentStore((store) => store.deleteComment);


	const is_own_comment = (user_profile.user_id === current_user.user_id)

	const [isModalVisible, setModalVisible] = useState(false);

    const formatDate = (date: string) => {
        return moment(date).fromNow();
    };


    return (
        <View style={styles.comment}>
            <View style={styles.comment_details}>
                <Image
                    style={styles.image}
                    source={user_profile.avatar_url}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
                <Text style={styles.user_name} >
                    {user_profile.username}
                </Text>
				{is_own_comment ? <Text style={styles.self_indication}>you</Text> : ""} 
                <Text style={styles.comment_date} ellipsizeMode="tail" numberOfLines={1}>
                    {formatDate(date)}
                </Text>
            </View>
            <Text  style={styles.comment_content}>
                {content}
            </Text>
            <View style={styles.comment_actions}>
                <View style={styles.up_down_vote_container}>
                    <TouchableOpacity onPress={()=>upComment(comment_id, current_user.user_id)}>			
						<Image 
							style={styles.up_vote_icon}
							contentFit="cover"
							source={ upvotes?.includes(current_user.user_id) ? require("../../assets/images/+_active.png") :  require("../../assets/images/+.png") } 
						/>
								
                    </TouchableOpacity>
                    <Text style={styles.up_down_vote_count}>{((upvotes?.length || 0) - (downvotes?.length || 0) )}</Text>
                    <TouchableOpacity onPress={()=>downComment(comment_id, current_user.user_id)}>
                        <Image 
                            style={styles.down_vote_icon}
                            contentFit="cover"
                            source={downvotes?.includes(current_user.user_id) ? require("../../assets/images/-_active.png") : require("../../assets/images/-.png")  }
                        />
                    </TouchableOpacity>
                </View>
				{is_own_comment ? 
					(
						<View style={styles.crud_action}>
							<TouchableOpacity style={styles.reply_button} onPress={()=>setModalVisible(true)}>
								<Image 
									style={[styles.reply_icon, styles.delete_icon]}
									contentFit="cover"
									source={require("../../assets/images/delete_icon.png")}
								/>
								<Text style={[styles.reply_label, styles.delete_label]}>Delete</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.reply_button}>
								<Image 
									style={[styles.reply_icon, styles.edit_icon]}
									contentFit="cover"
									source={require("../../assets/images/edit_icon.png")}
								/>
								<Text style={styles.reply_label}>Edit</Text>
							</TouchableOpacity>							
						</View>
					)			
					:
					(
						<TouchableOpacity style={styles.reply_button}>
							<Image 
								style={styles.reply_icon}
								contentFit="cover"
								source={require("../../assets/images/reply.png")}
							/>
							<Text style={styles.reply_label}>Reply</Text>
						</TouchableOpacity>
					)			
				}   
            </View>

			<Modal 
				isVisible={isModalVisible} 
				hideModalContentWhileAnimating={true} 
				animationIn="zoomIn"
				animationOut="zoomOut"
				backdropTransitionOutTiming={350}
			>
				<View style={styles.modal_content}>
					<Text style={styles.modal_title}>Delete comment</Text>
					<Text style={styles.modal_message}>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</Text>
					<View style={styles.modal_actions_container}>
						<TouchableOpacity onPress={()=>setModalVisible(false)} style={styles.modal_cancel_button}>
							<Text style={styles.modal_button_label}>NO, CANCEL</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{setModalVisible(false);  deleteComment(comment_id);}} style={styles.modal_accept_button}>
							<Text  style={styles.modal_button_label}>YES, DELETE</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
        </View>
    )
}

const styles = StyleSheet.create({
	comment_date:{
		color: "#67727E", 
		fontSize: 16,
		lineHeight: 24,
		fontFamily:"Rubik_400Regular",
		flex: 1
	},
	user_name:{
		color: "#334253",
		fontSize: 16,
		fontFamily:"Rubik_500Medium",
		overflow: "hidden",
		// flex: 1
	},
	image: {
		borderRadius: 50,
		height: 32,
		width: 32,
		backgroundColor: '#0553',
	},
	self_indication:{
		backgroundColor :"#5357B6",
		fontSize: 13,
		color: "#fff",
		paddingHorizontal: 6,
		paddingTop: 1,
		paddingBottom: 3,
		fontFamily:"Rubik_500Medium",
		borderRadius: 2
	},
	comment:{
		width: '100%',
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8
	},
	comment_details:{
		width: '100%',
		gap: 16,
		flexDirection:"row",
		alignItems:"center",
		overflow: "hidden"
	},
	comment_content:{
		marginTop: 16,
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	comment_actions:{
		flexDirection:"row",
		alignContent: "center",
		overflow: "hidden",
		marginTop: 16,
		justifyContent: "space-between"
	},
	up_down_vote_container: {
		flexDirection:"row",
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: "#F5F6FA",
		borderRadius: 10,
		alignItems: "center",
        gap: 8
	},
	up_down_vote_count:{
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
		width: 30,
		textAlign: "center",
		color: "#5357B6",
	},
	up_vote_icon: {
		height: 10,
		width: 10,
	},
	down_vote_icon: {
		height: 2.5,
		width: 10,
	},
	reply_button:{
		flexDirection:"row",
		alignItems: "center",
	},
	reply_icon:{
		height: 12.25,
		width: 14,
	},
	reply_label:{
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
		color:"#5357B6",
		marginLeft: 8
	},
	crud_action:{
		flexDirection: "row",
		gap: 16
	},
	delete_label:{
		color: "#ED6368"
	},
	edit_icon:{
		width: 14,
		height: 13.95
	},
	delete_icon: {
		width: 11.67,
		height: 14
	},

	modal_content:{
		backgroundColor: "#fff",
		borderRadius: 8,
		paddingHorizontal: 27,
		paddingVertical: 24
	},
	modal_message: {
		color: "#67727E",
		fontFamily:"Rubik_400Regular",
		fontSize: 16,
		lineHeight: 24,
		marginTop: 16
	},
	modal_title:{
		fontFamily: "Rubik_500Medium",
		fontSize: 20,
		color: "#334253"
	},
	modal_cancel_button:{
		flex:1,
		alignItems: "center",
		backgroundColor: "#67727E",
		borderRadius: 8,
		paddingVertical: 12
	},
	modal_accept_button:{
		flex:1,
		alignItems: "center",
		backgroundColor: "#ED6368",
		borderRadius: 8,
		paddingVertical: 12
	},
	modal_actions_container:{
		flexDirection: "row",
		gap: 12,
		marginTop: 16
	},
	modal_button_label:{
		color: "#fff",
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
	},

});
