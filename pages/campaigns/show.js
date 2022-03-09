import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button, GridRow, GridColumn } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

const Show = ({ summary, address }) => {
  const [balance, setBalance] = useState(
    web3.utils.fromWei(summary[1], "ether")
  );
  const [minimumContribution, setMinimumContribution] = useState(summary[0]);
  const [requestsCount, setRequestsCount] = useState(summary[2]);
  const [approversCount, setApproversCount] = useState(summary[3]);
  const [manager, setManager] = useState(summary[4]);

  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description:
          "Number of people who have already contributed to the campaign",
      },
      {
        header: balance,
        meta: "Campaign balance (ether)",
        description:
          "The balance is how much money this campaign is left to spend",
      },
    ];
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3> Campaign Details </h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}> {renderCards()} </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button primary> View Requests </Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

Show.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(props.query.address);

  const summary = await campaign.methods.getSummary().call();

  return { summary, address };
};

export default Show;
