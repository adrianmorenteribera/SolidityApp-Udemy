import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Link, Router } from "../routes";

const RequestRow = (props) => {
  const { Row, Cell } = Table;
  const { id, request, address, approversCount } = props;
  const [campaign] = useState(Campaign(address));
  const [readyToFinalize] = useState(
    request.approvalCount > approversCount / 2
  );

  const Approve = async () => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
    Router.replace(`/campaigns/${address}/requests`);
  };

  const Finalize = async () => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
    Router.replace(`/campaigns/${address}/requests`);
  };

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button onClick={Approve} color="green" basic>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button onClick={Finalize} color="teal" basic>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
