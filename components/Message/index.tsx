import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import moment from 'moment';
import { CommentInterface } from '@/constants/interfaces';
import userStore, { CurrentUser } from '@/stores/user';
import { Button } from '../Button';
import Modal from "react-native-modal";
import commentStore from '@/stores/comments';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface Props {
    data: CommentInterface;
    onPressUpMessage: (message_id: string, current_user_id: string) => void;
    onPressDownMessage: (message_id: string, current_user_id: string) => void;
    onPressUpdateButton: (message_id: string, new_comment: string) => void;
    onPressDeleteMessage: (message_id: string) => void;
	onReply: (message_id: string, reply_value: string, current_user: CurrentUser) => void;
}

export const Message = (
        {data: {content, upvotes, downvotes, user_profile, date, id},
        onPressUpMessage, 
        onPressUpdateButton,
        onPressDownMessage,
        onPressDeleteMessage,
		onReply
    } : Props) => {
    const current_user = userStore((store) => store.current_user);
	
    const [isModalVisible, setModalVisible] = useState(false);
	const [is_editing_message, setEditingMessage] = useState(false);
	const [is_reply_input_shown, setReplyInputShow] = useState(false);
	const [edit_message_input_value, editMessageInputValue] = useState(content);
	const [reply_value, setReplyValue] = useState("");

    const is_own_message = (user_profile.user_id === current_user.user_id);

    const formatDate = (date: string) => {
        return moment(date).fromNow();
    };

	const onPressReplyButton = () =>{
		setReplyInputShow(false);
		onReply(id, reply_value, current_user);
		setReplyValue("");
	}

    return (
        <View style={styles.message_container}>
            <View style={styles.message}>
                <View style={styles.message_details}>
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
                    {is_own_message ? <Text style={styles.self_indication}>you</Text> : ""} 
                    <Text style={styles.message_date} ellipsizeMode="tail" numberOfLines={1}>
                        {formatDate(date)}
                    </Text>
                </View>
                <Text style={[styles.message_content, is_editing_message ? styles.hidden : styles.flex]}>
                    {content}
                </Text>
                <View style={[styles.comment_actions, is_editing_message ? styles.hidden : styles.flex]}>
                    <View style={styles.up_down_vote_container}>
                        <TouchableOpacity onPress={()=>onPressUpMessage(id, current_user.user_id)}>			
                            <Image 
                                style={styles.up_vote_icon}
                                contentFit="cover"
                                source={ upvotes?.includes(current_user.user_id) ? require("../../assets/images/+_active.png") :  require("../../assets/images/+.png") } 
                            />								
                        </TouchableOpacity>
                        <Text style={styles.up_down_vote_count}>{((upvotes?.length || 0) - (downvotes?.length || 0) )}</Text>
                        <TouchableOpacity onPress={()=>onPressDownMessage(id, current_user.user_id)}>
                            <Image 
                                style={styles.down_vote_icon}
                                contentFit="cover"
                                source={downvotes?.includes(current_user.user_id) ? require("../../assets/images/-_active.png") : require("../../assets/images/-.png")  }
                            />
                        </TouchableOpacity>
                    </View>
                    {is_own_message ? 
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
                                <TouchableOpacity style={styles.reply_button} onPress={()=>setEditingMessage(true)}>
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
                            <TouchableOpacity style={styles.reply_button} onPress={()=>setReplyInputShow(!is_reply_input_shown)}>
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
                <View style={[ styles.editing_container, is_editing_message ?  styles.flex : styles.hidden]}>
                    <View style={styles.text_input_container}>
                        <TextInput 
                            style={styles.edit_text_input} 
                            multiline={true} 
                            value={edit_message_input_value} 
                            onChangeText={text => editMessageInputValue(text)}>
                        </TextInput>
                    </View>
                    <View style={styles.editing_comment_actions}>
                        <TouchableOpacity onPress={()=>setEditingMessage(false)}>
                            <Text style={styles.cancel_edit_button}>Cancel</Text>
                        </TouchableOpacity>
                        <Button button_text="Update" onPressButton={()=>{onPressUpdateButton(id, edit_message_input_value); setEditingMessage(false);}} />
                    </View>		
                </View>			
            </View>
			{
				is_reply_input_shown ? 
				(
					<View style={styles.add_reply_container}>				
						<View style={styles.text_input_container}>
							<TextInput 
								value={reply_value} 
								onChangeText={text => setReplyValue(text)}
							>
							</TextInput>
						</View>
						<View style={styles.reply_action_container}>
							<Image
								style={styles.image}
								source={current_user.avatar_url}
								placeholder={{ blurhash }}
								contentFit="cover"
								transition={1000}
							/>
							<Button button_text="Reply" onPressButton={onPressReplyButton}/>
						</View>
					</View>
				):""
			}
			
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
						<TouchableOpacity onPress={()=>{setModalVisible(false); onPressDeleteMessage(id);}} style={styles.modal_accept_button}>
							<Text style={styles.modal_button_label}>YES, DELETE</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
        </View>
  
    )
}

const styles = StyleSheet.create({
	reply_action_container:{
		flexDirection:"row",
		marginTop: 16,
		alignItems: "center",
		justifyContent: "space-between"
	},
	add_reply_container:{
		backgroundColor: "#fff",
		padding: 16,
		marginTop: 8,
		flex: 1
	
	},
	message_container:{
		flexDirection: "column",

	},
	flex:{
		display: "flex"
	},
	hidden:{
		display: "none"
	},
	message_date:{
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
	message:{
        flex: 1,
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8
	},
	message_details:{
		width: '100%',
		gap: 16,
		flexDirection:"row",
		alignItems:"center",
		overflow: "hidden"
	},
	message_content:{
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


	editing_container:{
		marginTop: 16
	},
	text_input_container:{
		borderColor: "#E9EBF0",
		borderWidth: 1,
		borderRadius: 8,
		padding: 12
	},
	edit_text_input:{
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	cancel_edit_button:{
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	editing_comment_actions:{
		flexDirection: "row",
		marginTop: 16,
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 8,
	},
	
	
});


