import React, { useState } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

const campaignIndex = ({ campaigns }) => {
  const [deployedCampaigns, setDeployedCampaigns] = useState(campaigns);

  const renderCampaigns = () => {
    const items = deployedCampaigns.map((address) => {
      return {
        header: address,
        description: (
          <>
            <Link route={`/campaigns/${address}`}>
              <a> View Campaign</a>
            </Link>
          </>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3> Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

campaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default campaignIndex;
