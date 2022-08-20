import { StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { Icon, Layout,Text,Input,Datepicker } from '@ui-kitten/components';
import DatePicker from 'react-native-date-picker'

const ClockIcon = props => <Icon {...props} name="clock-outline" />;
const CalendarIcon  = props => <Icon {...props} name="calendar" />;

const AddNotes = () => {
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false)
  return (
    <Layout style={styles.Container}>
    <Layout style={styles.Head}>
    <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    <Icon 
    style={styles.icon}
    fill='#7810E0'
    name='file-add-outline'/>
    <Text style={{fontSize:25,fontFamily:"Recoleta-Bold",marginLeft:60}}>Add Notes</Text>
    <Icon
    style={styles.icon1}
    fill='#8F9BB3'
    name="close-outline"/>
    </Layout>
    <Layout style={styles.notes}>
    <Input 
    label={evaProps => <Text {...evaProps} style={{fontFamily:"GTWalsheimPro-Bold",marginBottom:5}}>Time</Text>}
    accessoryRight={ClockIcon}
    multiline={true}
    textStyle={{ minHeight: 40 }}
    date={date}
    
    />
    <TouchableOpacity style={{backgroundColor:"transparent",height:50,width:"100%",position:"absolute",top:25}} onPress={()=>setOpen(true)}></TouchableOpacity>
    <Datepicker
    label={evaProps => <Text {...evaProps} style={{fontFamily:"GTWalsheimPro-Bold",marginBottom:5}}>Date</Text>}
    accessoryRight={CalendarIcon}
    size="large"
    date={date}
    onSelect={nextDate => setDate(nextDate)}
    style={styles.date}
    />
    <Input
    multiline={true}
    textStyle={{ minHeight: 70 }}
    label={evaProps => <Text {...evaProps} style={{fontFamily:"GTWalsheimPro-Bold",marginBottom:5}}>Text Note</Text>}
    style={{marginTop:30}}
    />
    </Layout>
    </Layout>
  )
}

export default AddNotes

const styles = StyleSheet.create({
    mainContainer:{
        height: "100%",
        paddingHorizontal: 30,
        backgroundColor: "#fff",
    },
    Head:{
        marginTop:40,
        display:"flex",
        flexDirection:"row"
    },
    icon: {
        width: 32,
        height: 32,
    },
    icon1: {
        width: 32,
        height: 32,
        marginLeft:80
    },
    notes:{
        marginTop:40
    },
    date:{
        marginTop:30
    }
})