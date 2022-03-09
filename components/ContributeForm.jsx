import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = (props) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [address, setAddress] = useState(address);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const campaign = Campaign(props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      Router.replace(`/campaigns/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label> Amount to Contribute </label>
        <Input
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        ></Input>
      </Form.Field>
      <Button loading={loading} primary>
        Contribute!
      </Button>
      <Message error header="Oops!" content={errorMessage} />
    </Form>
  );
};

export default ContributeForm;
