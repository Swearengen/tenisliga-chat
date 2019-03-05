import React from 'react'
import { observer } from 'mobx-react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme: any) => ({
    root: {

    },
    textField: {

    }
})

interface State {
    text: string;
}

interface Props extends WithStyles<typeof styles> {
    onChange: () => void;
    onSubmit: (text: string) => void;
}

@observer
class MessageForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            text: '',
        }
    }

    onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        this.props.onSubmit(this.state.text)
        this.setState({ text: '' })
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: e.target.value })
        if (this.props.onChange) {
            this.props.onChange()
        }
    }

    render () {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <TextField
                        id="standard-multiline-flexible"
                        placeholder="Placeholder"
                        multiline
                        rowsMax="3"
                        value={`sdadasdas \n dsdsadas`}
                        onChange={this.onChange}
                        className={classes.textField}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        style={{
                            backgroundColor: "#fff"
                        }}
                    />
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(MessageForm)